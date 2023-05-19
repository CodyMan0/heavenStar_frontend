import {
  Box,
  Typography,
  Button,
  TextField,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import FlexBetween from 'components/FlexBetween';
import { Formik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { login, register } from 'api/auth';
import { useDispatch } from 'react-redux';
import HTTPError from 'network/httpError';
import { setLogin } from 'state';
import { useRouter } from 'hooks/useRouter';

const registerSchema = yup.object().shape({
  firstName: yup.string().required('이름을 기입해주세요'),
  lastName: yup.string().required('성을 기입해주세요'),
  email: yup.string().email(`'@'가 포함되지 않았습니다.`).required('필수'),
  password: yup.string().min(5, '최소 5자예요').required('필수'),
  location: yup.string().required('정확한 위치를 입력해주세요'),
  occupation: yup.string().required('필수'),
  picture: yup.string().required('프로필 사전을 지정해주세요'),
});

const loginSchema = yup.object().shape({
  email: yup.string().email('유효하지 않은 이메일이에요').required('이메일 주소를 입력해주세요.'),
  password: yup.string().required('비밀번호를 입력해주세요.'),
});

const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  occupation: '',
  picture: '',
};

const initialValuesLogin = {
  email: '',
  password: '',
};

const Form = ({ pageType, setPageType }) => {
  const dispatch = useDispatch();
  const { routeTo } = useRouter();
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery('(min-width: 600px)');
  const isLogin = pageType === 'login';
  const isRegister = pageType === 'register';

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) {
      const loggedIn = await login(values, onSubmitProps);
      if (!loggedIn) return;
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      routeTo('/home');
    }

    if (isRegister) {
      const registerResponse = await register(
        values,
        setPageType,
        onSubmitProps
      );
      if ('error' in registerResponse) {
        toast.error('이미 사용된 이메일이네요');
        throw new HTTPError(
          savedUserResponse?.status,
          savedUserResponse?.statusText
        ).errorMessage;
      } else {
        toast.success('회원가입 성공하셨어요');
        setTimeout(() => {
          setPageType('login');
        }, 1000);
      }
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="20px"
            gridTemplateColumns="repeat(4,minmax(0,1fr))"
            sx={{
              '& > div': {
                gridColumn: isNonMobile ? undefined : 'span 4',
              },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="이름"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: 'span 2 ' }}
                />
                <TextField
                  label="성"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: 'span 2 ' }}
                />
                <TextField
                  label="주소"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  label="직업"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: 'span 4' }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={acceptedFiles =>
                      setFieldValue('picture', acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>프로필 이미지 생성하기 클릭!</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

        <Typography fontWeight="700" fontSize='1rem' sx={{ gridColumn: 'span 4' }}>
          이메일 
        </Typography>
            <TextField
              label="이메일"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: 'span 4 ' }}
            />
        <Typography fontWeight="700" fontSize='1rem' sx={{ gridColumn: 'span 4' }}>
          패스워드 
        </Typography>
            <TextField
              label="패스워드"
              type="password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: 'span 4 ' }}
            />
          </Box>

          {/* button */}

          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                fontSize: '1rem',
                fontWeight: "700",
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': { color: palette.primary.main },
              }}
            >
              {isLogin ? '이메일 로그인' : '회원가입 완료'}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? 'register' : 'login');
                resetForm();
              }}
              sx={{
                fontSize: "14px",
                display: 'flex',
                justifyContent: 'center',
                color: palette.neutral.main,
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              {isLogin
                ? '회원가입'
                : '로그인'}
            </Typography>
          </Box>
          <Toaster position="top-right" reverseOrder={false} />
        </form>
      )}
    </Formik>
  );
};

export default Form;

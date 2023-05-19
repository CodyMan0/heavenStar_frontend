import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
// import Form from './Form';
import Navbar from 'scenes/navbar';
import Form from './Form';

const LoginPage = () => {
  const theme = useTheme();
  console.log(theme)
  const [pageType, setPageType] = useState('login');

  const isNonMobileScreens = useMediaQuery('(min-width: 1000px');
  return (
    <Box backgroundColor={theme.palette.background.lightGrey}>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        m = "1rem auto"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary"  sx={{
          borderBottom: 0.5,
          borderColor: theme.palette.background.border,
          borderRadius: 1
        }}>
          Podo
        </Typography>
      </Box>
    <Box  sx={{
        maxWidth: 420,
        m: '0 auto',
    }}>
        <Typography fontWeight="700"  fontSize="32px" variant="h2" sx={{ mb: '2.0rem' , pt : '2.0rem'}}  align='center'>
          {pageType === 'login' ? '로그인' : '이메일 간편가입'}
        </Typography>
      <Box
        width="100%"
        mt='3rem'
        p="3rem"
        backgroundColor={theme.palette.background.alt}
        sx={{
          border: 0.5,
          borderColor: theme.palette.background.border,
          borderRadius: 1
        }}
      >
      
        <Form pageType={pageType} setPageType={setPageType} />
      </Box>
    </Box>
  </Box>
  );
};
export default LoginPage;

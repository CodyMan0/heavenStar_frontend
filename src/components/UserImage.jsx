import { Box } from '@mui/material';

const UserImage = ({ image, size = '60px' }) => {
  const URL = process.env.REACT_APP_BASE_URL;
<<<<<<< HEAD

=======
  console.log(image);
>>>>>>> fc320a067790ba9f244d42426e9b8658122ab91f
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        src={`${URL}/assets/${image}`}
        alt="user"
      />
    </Box>
  );
};

export default UserImage;

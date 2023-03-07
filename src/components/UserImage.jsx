import { Box } from '@mui/material';

const UserImage = ({ image, size = '60px' }) => {
  const URL = process.env.REACT_APP_BASE_URL;

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

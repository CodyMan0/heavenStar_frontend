import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
// import Form from './Form';
import Navbar from 'scenes/navbar';
import Form from './Form';

const LoginPage = () => {
  const theme = useTheme();
  const [pageType, setPageType] = useState('login');

  const isNonMobileScreens = useMediaQuery('(min-width: 1000px');
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Podo
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? '30%' : '85%'}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="700" variant="h2" sx={{ mb: '1.5rem' }}>
          {pageType === 'login' ? '로그인' : '이메일 간편가입'}
        </Typography>
        <Form pageType={pageType} setPageType={setPageType} />
      </Box>
    </Box>
  );
};
export default LoginPage;

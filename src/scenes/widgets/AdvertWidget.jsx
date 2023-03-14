import { Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const URL = process.env.REACT_APP_BASE_URL;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          기능 추가 예정
        </Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={`${URL}/assets/info4.jpeg`}
        style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
      />
    </WidgetWrapper>
  );
};

export default AdvertWidget;

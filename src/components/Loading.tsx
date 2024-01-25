import { ActivityIndicator } from 'react-native';

import { useColors } from '../utils/hooks';

type ILoading = {
  loading: boolean;
};
export const Loading: React.FC<ILoading> = ({ loading }) => {
  const { colors } = useColors();

  return (
    loading && (
      <ActivityIndicator
        size="large"
        color={colors.text}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    )
  );
};

import {useCallback, useState} from 'react';

export const useOnRefresh = (refreshAction: any) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshAction();
    } catch (error) {
      console.error('Error refreshing:', error);
    } finally {
      setRefreshing(false);
    }
  }, [refreshAction]);

  return {refreshing, onRefresh};
};

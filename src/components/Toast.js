import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';

const Toast = () => {
  const { isLoading, error } = useSelector((state) => state.fetch);
  const toast = useToast();

  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setTimeout(() => {
        toast({
          title: 'Loading taking longer than expected',
          description: 'Please wait while we fetch the data...',
          status: 'warning',
          duration: 5000, // 5 seconds
          isClosable: true,
        });
      }, 5000); // 5 seconds
    } else {
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [isLoading, toast]);

  useEffect(() => {
    if (error && error.message !== '') { // Check if error and error.message exist
      toast({
        title: 'Error Loading Word',
        description: error.message,
        status: 'error',
        duration: 10000, // 10 seconds
        isClosable: true,
      });
    }
  }, [error]);
  
  return null;
};

export default Toast;
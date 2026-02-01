import { toast } from 'sonner'; // or your toast lib

export const showErrorToast = (description: string) => {
  toast.error('Error', {
    description,
  });
};

export const showSuccessToast = (description: string) => {
  toast.success('Success', {
    description,
  });
};

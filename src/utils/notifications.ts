import toast from 'react-hot-toast';

export const notify = {
  success: (message: string) => {
    toast.success(message, {
      style: {
        background: '#4ade80',
        color: '#fff',
      },
      duration: 3000,
    });
  },
  error: (message: string) => {
    toast.error(message, {
      style: {
        background: '#f87171',
        color: '#fff',
      },
      duration: 4000,
    });
  },
  loading: (message: string) => {
    return toast.loading(message, {
      style: {
        background: '#60a5fa',
        color: '#fff',
      },
    });
  },
}; 
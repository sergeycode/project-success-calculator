import { Box } from '@chakra-ui/react';

export default function ChevronDown({ ...props }) {
  return (
    <Box {...props}>
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.2071 8.87175C18.5976 9.26227 18.5976 9.89544 18.2071 10.286L12 16.4931L5.79289 10.286C5.40237 9.89544 5.40237 9.26227 5.79289 8.87175C6.18342 8.48123 6.81658 8.48123 7.20711 8.87175L12 13.6646L16.7929 8.87175C17.1834 8.48123 17.8166 8.48123 18.2071 8.87175Z"
          fill="currentColor"
        />
      </svg>
    </Box>
  );
}

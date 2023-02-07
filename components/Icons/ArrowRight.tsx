import { Icon, IconProps } from '@chakra-ui/react';

export default function ArrowRight({
  color,
  _groupHover,
  ...props
}: IconProps) {
  return (
    <Icon
      viewBox="0 0 16 16"
      color={color}
      _groupHover={_groupHover}
      position="relative"
      zIndex="2"
      transition="color 0.3s ease-in-out"
      {...props}
    >
      <path
        d="M8.70531 0.705315C8.31578 0.31578 7.68422 0.31578 7.29468 0.705316C6.9054 1.0946 6.90511 1.72568 7.29405 2.11531L12.17 7H0.999999C0.447714 7 0 7.44772 0 8C0 8.55229 0.447715 9 1 9H12.17L7.29405 13.8847C6.90511 14.2743 6.9054 14.9054 7.29468 15.2947C7.68422 15.6842 8.31578 15.6842 8.70532 15.2947L16 8L8.70531 0.705315Z"
        fill="currentColor"
      />
    </Icon>
  );
}

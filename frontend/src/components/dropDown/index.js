import { DropdownWrapper } from './styles/dropDown';

export default function DropdownComponent({ children, ...restProps }) {
  return <DropdownWrapper {...restProps}>{children}</DropdownWrapper>;
}

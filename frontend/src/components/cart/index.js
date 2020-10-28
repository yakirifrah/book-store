import React from 'react';
import { Container, Title, SubTitle, Image, Item, Meta, Icon, Entities } from './styles/cart';

export default function Cart({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Cart.Title = function CartTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Cart.Image = function CartImage({ children, ...restProps }) {
  return <Image {...restProps} />;
};

Cart.SubTitle = function CartSubTitle({ children, ...restProps }) {
  return <SubTitle {...restProps}>{children}</SubTitle>;
};

Cart.Item = function CartItem({ item, children, ...restProps }) {
  return <Item {...restProps}>{children}</Item>;
};

Cart.Entities = function CartEntities({ children, ...restProps }) {
  return <Entities {...restProps}>{children}</Entities>;
};

Cart.Icon = function CartIcon({ children, ...restProps }) {
  return <Icon {...restProps}>{children}</Icon>;
};

Cart.Meta = function CartMeta({ children, ...restProps }) {
  return <Meta {...restProps}>{children}</Meta>;
};
Cart.Entities = function CartEntities({ children, ...restProps }) {
  return <Entities {...restProps}>{children}</Entities>;
};

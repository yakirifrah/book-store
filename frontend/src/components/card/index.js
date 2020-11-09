import { Container, Title, SubTitle, Image, Item, Entities, Meta, Icon } from './styles/card';

export default function Card({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Card.Title = function CardTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Card.Image = function CardImage({ children, ...restProps }) {
  return <Image {...restProps} />;
};

Card.SubTitle = function CardSubTitle({ children, ...restProps }) {
  return <SubTitle {...restProps}>{children}</SubTitle>;
};

Card.Item = function CardItem({ item, children, ...restProps }) {
  return <Item {...restProps}>{children}</Item>;
};

Card.Entities = function CardEntities({ children, ...restProps }) {
  return <Entities {...restProps}>{children}</Entities>;
};

Card.Icon = function CardIcon({ children, ...restProps }) {
  return <Icon {...restProps}>{children}</Icon>;
};

Card.Meta = function CardMeta({ children, ...restProps }) {
  return <Meta {...restProps}>{children}</Meta>;
};

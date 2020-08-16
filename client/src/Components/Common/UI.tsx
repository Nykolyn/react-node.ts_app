import { Box as MUBox, Button as MUButton, IconButton as MUIconButton, TextField as MuInput } from '@material-ui/core';
import { Link as RouteLink } from 'react-router-dom';
import styled from 'styled-components';
import { space, layout, color, flexbox, border, typography, background, grid, shadow, position } from 'styled-system';

export const Box = styled(MUBox)`
  ${space}
  ${color}
  ${grid}
  ${layout}
  ${flexbox}
  ${border}
  ${typography}
  ${shadow}
  ${position}
  ${background}
`;

export const Text = styled.span`
  ${space}
  ${color}
  ${typography}
  ${layout}
`;

export const TextBlock: React.FC<any> = styled.p`
  ${space}
  ${color}
  ${typography}
  ${position}
  ${border}
  ${layout}
`;

TextBlock.defaultProps = {
  mb: 0,
  mt: 0,
  fontFamily: 'roboto',
};

export const Link: React.FC<any> = styled(RouteLink)`
  ${space}
  ${color}
  ${typography}
  ${layout}
`;

Link.defaultProps = {
  fontFamily: 'montserrat',
};

export const Image = styled.img`
  ${space}
  ${color}
  ${typography}
  ${layout}
  ${position}
  ${border}
  ${shadow}
`;

export const Button = styled(MUButton)`  
  ${space}
  ${color}
  ${typography}
  ${layout}
  ${flexbox}
  ${background}
  ${border}
`;

export const IconButton = styled(MUIconButton)`  
  ${space}
  ${color}
  ${typography}
  ${layout}
  ${flexbox}
  ${border}
`;

export const Input = styled(MuInput)`
  ${space}
  ${color}
  ${grid}
  ${layout}
  ${flexbox}
  ${border}
  ${typography}
  ${shadow}
  ${position}
  ${background}
`;

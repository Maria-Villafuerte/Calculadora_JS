import React from 'react';
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Digit = Template.bind({});
Digit.args = {
  label: '1',
  onClick: () => alert('Button 1 clicked'),
};

export const Operator = Template.bind({});
Operator.args = {
  label: '+',
  onClick: () => alert('Button + clicked'),
};

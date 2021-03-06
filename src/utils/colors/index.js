const mainColors = {
  white: '#FFFFFF',
  white2: '#FAFAFA',
  black: '#000000',
  black2: '#525252',
  black3: '#4f4f4f',
  gray: '#C4C4C4',
  gray2: '#E5E5E5',
  gray3: '#828282',
  gray4: '#E0E0E0',
  blue: '#1E2F89',
  blue75: 'rgba(30, 47, 137, 0.75)',
  blue50: 'rgba(30, 47, 137, 0.50)',
  blue2: '#B6C0F8',
  orange: '#F5A93F',
  orangeTransparent: 'rgba(245, 169, 63, 0.35)',
  green: '#00752F',
  green2: '#219653',
  red: '#EB5757',
};

export const colors = {
  primary: mainColors.blue,
  secondary: mainColors.orange,
  tersiary: mainColors.blue2,
  white: mainColors.white,
  white2: mainColors.white2,
  black: mainColors.black,
  gray: mainColors.gray,
  text: {
    black: mainColors.black2,
    black2: mainColors.black3,
    secondary: mainColors.orange,
    tersiary: mainColors.green,
    gray: mainColors.gray3,
    placeholder: mainColors.gray2,
    red: mainColors.red,
    white: mainColors.white,
  },
  border: {
    error: mainColors.red,
    on: mainColors.orange,
    off: mainColors.gray4,
  },
  progress: {
    on: mainColors.orange,
    off: mainColors.orangeTransparent,
  },
  drawer: {
    active: mainColors.blue75,
    inactive: mainColors.blue50,
  },
  taskType: {
    pickUp: mainColors.blue2,
    delivered: mainColors.green2,
  },
};

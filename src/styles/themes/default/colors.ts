const themeColors = {
   /**
   * Primary colors define the whole look and feel of your project.
   * All interactive elements, such as buttons, links, form elements, etc.
   * Use the primary color palette.
   */
   primaryDarker: "#1F5BB0", // Darker shade of #266DD3
   primaryDark: "#2376C4",   // Dark shade of #266DD3
   primary: "#266DD3",       // New primary color
   primaryOpacity: "#266DD3bd", // Primary color with opacity
   primaryLight: "#4B87DC",  // Light shade of #266DD3
   primaryLighter: "#7AA4E5", // Lighter shade of #266DD3
 
   /**
    * The secondary color is as important as the main color,
    * some parts of the product have several buttons or important actions
    * nearby, so that the work is not monotonous,
    * this color comes next to the primary color.
    */
   secondary: '#0474BA',
   secondaryDarker: '#023E64',
   secondaryDark: '#035E96',
   secondaryLight: '#69C4FC',
   secondaryLighter: '#E6F5FE',
   secondaryLightest: '#FBFAEA',
 
   /**
    * The tertiary color is as important as the main color,
    * some parts of the product have several buttons or important actions nearby,
    * so that the work is not monotonous, this color comes next to the primary color.
    */
   tertiary: '#703F12',
   tertiaryDarker: '#2C1907',
   tertiaryDark: '#58320E',
   tertiaryLight: '#E3974F',
   tertiaryLighter: '#F1CBA7',
   tertiaryLightest: '#FBF2E9',
 
   /**
    * Neutral colors palette used for body, texts, boxes, etc.
    */
   newtral: '#CCCCCC',
   newtralDarker: '#1A1A1A',
   newtralDark: '#AEAEAE',
   newtralLight: '#E8E8E8',
   newtralLighter: '#F2F2F2',
   newtralLightest: '#FFFFFF',
 
   /**
    * Is associated with but not limited to danger conditions
    */
   errorDarker: '#990F0F',
   errorDark: '#ff4d4f',
   errorLiger: '#ffa39e',
 
   /**
    * Is associated with but not limited to danger conditions
    */
   successDarker: '#097E38',
   successDark: '#219653',
 
   /**
    * border
    */
   inputGray: '#CCCCCC',
   borderBottomDisabled: '#797979',
   //TODO:
   borderBottomButton: '#632D03',
   borderCheckbox: '#D8D8D8',
 
   //Background
   background1: '#E2E1E6',
   background2: '#F8F7FA',
   background3: '#FFFFFF',
   background4: '#F9F6FB',
   background5: '#E8DF6A',
 
   // Text
   text1: '#19171A',
   text2: '#7B7583',
   text3: '#B9B5C2',
   text4: '#000000',
   text5: '#FFFFFF',
 
   // Notification
   green1: '#07D95A',
   green2: '#9CF0BD',
   red1: '#F8183E',
   red2: '#FCA3B2',
 
   //Base
   gray: '#B9B5C2',
   grayDark: '#5A5C63',
   grayLight: '#D9D9D9',
};

const colors = {
  ...themeColors,
  backgroundColor: themeColors.background3,
  other: themeColors,
  primaryColor: themeColors.primary,
  textColor: themeColors.text2,
};
export default colors;

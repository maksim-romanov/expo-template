import { mergeDeepRight } from "ramda";

import appThemeJson from "./app-theme.json";
import brandThemeJson from "./brand-theme.json";

const getThemes = (brandThemes: typeof brandThemeJson) => {
  const themes = mergeDeepRight(appThemeJson, brandThemes);

  const base = {
    light: {
      button: {
        sizes: {
          small: {
            borderRadius: themes.light.brand.sizes["button-border-radius"],
            fontSize: themes.light.brand.sizes["text-button-size"],
          },
          medium: {
            borderRadius: themes.light.brand.sizes["button-border-radius"],
            fontSize: themes.light.brand.sizes["text-button-size"],
          },
        },

        types: {
          disabled: {
            border: themes.light.colors["Grey/Text/Disabled"],
            background: themes.light.colors["Grey/Text/Disabled"],
            color: themes.light.colors["Grey/white"],
          },

          primary: {
            border: themes.light.brand.colors["brand-primary"],
            background: themes.light.brand.colors["brand-primary"],
            color: themes.light.colors["Grey/white"],
          },
        },
      },

      components: {
        proposal: {
          badge: {
            backgroundColor: themes.light.brand.colors["brand-extra"],
          },
        },
      },

      typography: {
        title: {
          fonts: {
            400: themes.light.brand.typography["headline-text-regular"],
            500: `${themes.light.brand.typography["headline-text-medium"]}`,
            600: `${themes.light.brand.typography["headline-text-bold"]}`,
          },

          sizes: {
            big: themes.light.brand.sizes["big-headline-size"],
            medium: themes.light.brand.sizes["medium-headline-size"],
            small: themes.light.brand.sizes["small-headline-size"],
          },
        },

        text: {
          fonts: {
            400: themes.light.brand.typography["body-text-regular"],
            500: themes.light.brand.typography["body-text-medium"],
            600: themes.light.brand.typography["body-text-bold"],
          },

          sizes: {
            default: themes.light.brand.sizes["text-default-size"],
            small: themes.light.brand.sizes["text-small-size"],
            tiny: themes.light.brand.sizes["text-tiny-size"],
          },

          types: {
            light: {
              color: themes.light.brand.colors["text-light-color"],
            },
            secondary: {
              color: themes.light.brand.colors["text-secondary-color"],
            },
            default: {
              color: themes.light.brand.colors["text-primary-color"],
            },
          },
        },
      },

      background: {
        default: themes.light.brand.colors["background-color"],
        // primary: "#FFFFFF",
        // secondary: "#FAFAFA",
      },

      input: {
        types: {
          default: {
            border: {
              focus: themes.light.brand.colors["brand-primary"],
            },
            background: {
              idle: themes.light.brand.colors["background-color"],
            },
            placeholderTextColor: themes.light.brand.colors["text-light-color"],
            text: {
              idle: themes.light.colors["Text/Default"],
            },
          },
        },
      },

      drawer: {
        "menu-button": {
          color: themes.light.brand.colors["text-primary-color"],
          borderColor: themes.light.brand.colors["text-secondary-color"],
          background: themes.light.colors["Base/White"],
        },
      },

      screens: {
        trips: {
          header: {
            background: themes.light.brand.colors["header-section-color"],

            headline: {
              color: themes.light.brand.colors["text-primary-color"],
            },
            subHeadline: {
              color: themes.light.brand.colors["text-secondary-color"],
            },
          },

          tabbar: {
            active: themes.light.brand.colors["brand-primary"],
            inactive: themes.light.brand.colors["text-secondary-color"],
          },
        },

        trip: {
          header: {
            background: "#3F3C43",
          },
        },

        onboarding: {
          background: themes.light.colors["Grey/50"],
          slider: {
            dots: {
              active: themes.light.brand.colors["brand-primary"],
              inactive: themes.light.colors["Grey/200"],
            },
          },
          item: {
            lineHeight: undefined,
            platformPadding: undefined,
          },
        },

        proposalSurvey: {
          title: {
            lineHeight: 52,
            platformPadding: undefined,
          },
          countdown: {
            title: {
              lineHeight: undefined,
              platformPadding: undefined,
            },
          },
        },
      },
    },
  };

  return mergeDeepRight(base, themes);
};

export const appThemes = getThemes(brandThemeJson);

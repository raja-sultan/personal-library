import "@splidejs/react-splide/css/core";
import "@splidejs/react-splide/css/skyblue";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Box, Typography } from "@mui/material";
import { SliderData } from "./slider-data";
import type { AuthSliderTypes } from "./slider.type";

export function AuthSlider(): JSX.Element {
  const splideOptions: AuthSliderTypes = {
    type: "loop",
    autoplay: true,
    arrows: false,
    rewind: true,
    gap: "1rem",
  };

  return (
    <Box
      sx={{
        "& .splide__pagination": {
          bottom: "-3rem",
        },
        "& .splide__pagination__page": {
          backgroundColor: "primary.light",
        },
        "& .splide__pagination__page.is-active": {
          backgroundColor: "common.white",
        },
      }}
    >
      <Splide options={splideOptions}>
        {SliderData.map((item) => (
          <SplideSlide key={item.id}>
            <Box
              sx={{
                backgroundColor: "primary.dark",
                borderRadius: "2rem",
                minHeight: "17rem",
                p: "2.5rem",
                display: "flex",
                flexDirection: "column",
                rowGap: 2,
              }}
            >
              <Typography
                sx={{
                  variant: "h5",
                  color: "common.white",
                  fontWeight: 600,
                }}
              >
                {item.heading}
              </Typography>
              <Typography
                sx={{
                  variant: "h5",
                  color: "common.white",
                  fontWeight: 400,
                }}
              >
                {item.description}
              </Typography>
            </Box>
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
}

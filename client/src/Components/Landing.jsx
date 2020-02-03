import React, { Component } from "react";
import Particles from "react-particles-js";

export default class Landing extends Component {
  render() {
    return (
      <div className="landing-container">
        <div className="landing-title">
          <span className="landing-title-text"> D E V C O N N E C T </span>
          <p className="landing-subtitle display-2 lead">
            Find your kind. Code your dream.
          </p>
        </div>
        <Particles
          style={{
            backgroundColor: "#272F42",
            zIndex: -100,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh"
          }}
          params={{
            particles: {
              number: {
                value: 150,
                density: {
                  enable: true,
                  value_area: 1200.8766334760375
                }
              },
              color: {
                value: "#fff"
              },
              shape: {
                type: "circle",
                stroke: {
                  width: 0,
                  color: "#fff"
                },
                polygon: {
                  nb_sides: 3
                }
              },
              opacity: {
                value: 0.5,
                random: false,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false
                }
              },
              size: {
                value: 3,
                random: true,
                anim: {
                  enable: false,
                  speed: 51.16086437498474,
                  size_min: 0.1,
                  sync: false
                }
              },
              line_linked: {
                enable: true,
                distance: 192.40944730386272,
                color: "#ffffff",
                opacity: 0.38481889460772545,
                width: 0.8017060304327615
              },
              move: {
                enable: true,
                speed: 1.003412060865523,
                direction: "right",
                random: true,
                straight: false,
                out_mode: "bounce",
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200
                }
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: true,
                  mode: "grab"
                },
                onclick: {
                  enable: true,
                  mode: "repulse"
                },
                resize: true
              },
              modes: {
                grab: {
                  distance: 194.89853095232286,
                  line_linked: {
                    opacity: 1
                  }
                },
                bubble: {
                  distance: 400,
                  size: 40,
                  duration: 2,
                  opacity: 8,
                  speed: 3
                },
                repulse: {
                  distance: 113.69080972218832,
                  duration: 0.4
                },
                push: {
                  particles_nb: 4
                },
                remove: {
                  particles_nb: 2
                }
              }
            },
            retina_detect: true
          }}
        ></Particles>
      </div>
    );
  }
}

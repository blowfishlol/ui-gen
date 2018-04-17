export default({
  user: {
    label: "User Data",
    info: "",
    child: {
      name: {
        label: "Full Name",
        info: "Fill the box with your name bitte",
        element: {
          type: "text",
          nullable: true,
          render: "true",
          value: {
            default: null,
            placeholder: "Name"
          },
          layout: {
            desktop: 6,
            tablet: 6,
            phone: 12
          }
        }
      },
      birthdate: {
        label: "Birth Date",
        info: "",
        element: {
          type: "date",
          nullable: true,
          value: {
            default: null
          },
          layout: {
            desktop: 3,
            tablet: 4,
            phone: 12
          }
        }
      },
      gender: {
        label: "Gender",
        info: "",
        element: {
          type: "dropdown",
          nullable: true,
          value: {
            contents: [
              {text: "Female", value: "f"},
              {text: "Male", value: "m"}
            ],
            default: null
          },
          layout: {
            desktop: 3,
            tablet: 4,
            phone: 12
          }
        }
      },
      appointment: {
        label: "Appointment",
        info: "",
        element: {
          type: "map",
          nullable: true,
          child: {
            time: {
              label: "Appointment Time",
              info: "",
              element: {
                type: "time",
                nullable: true,
                value: {
                  default: null
                },
                layout: {
                  desktop: 6,
                  tablet: 6,
                  phone: 12
                }
              }
            },
            attend: {
              label: "Attended?",
              info: "",
              element: {
                type: "toggle",
                nullable: false,
                value: {
                  default: true
                },
                layout: {
                  desktop: 6,
                  tablet: 6,
                  phone: 12
                }
              }
            }
          }
        }
      },
      phone: {
        label: "Phone Number",
        info: "",
        element: {
          type: "array",
          nullable: true,
          layout: {
            desktop: 6,
            tablet: 6,
            phone: 12
          },
          child: "number"
        }
      },
      theme: {
        label: "Theme Setting",
        info: "",
        element: {
          type: "color",
          nullable: true,
          value: {
            default: {
              palette: "indigo",
              base: "50",
              hue1: "200",
              hue2: "600",
              hue3: "900"
            }
          },
          layout: {
            desktop: 6,
            tablet: 6,
            phone: 12
          }
        }
      },
      language: {
        label: "Language",
        info: "",
        element: {
          type: "checkbox",
          nullable: false,
          value: {
            contents: [
              {text: "English", value: "en", checked: true},
              {text: "Indonesian", value: "id", checked: false},
              {text: "Deutsch", value: "de", checked: false}
            ]
          },
          layout: {
            desktop: 3,
            tablet: 4,
            phone: 12
          }
        }
      }
    }
  }
})
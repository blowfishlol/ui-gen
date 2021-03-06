var descriptions = [
  {
    id: 1,
    name: "version 1.0.0",
    description: [
      {
        "pagename": "Initialize",
        "rendered": "true",
        "form": [
            {
                "label": "Name",
                "type": "text",
                "path": "installation.user.name",
                "value": {
                    "default": null,
                    "placeholder": "Input Username"
                },
                "layout": {
                    "mobile": 12,
                    "tablet": 4,
                    "desktop": 3
                }
            },
            {
                "label": "Do you accept the terms and conditions?",
                "type": "toggle",
                "path": "installation.user.accept",
                "value": {
                    "default": false
                },
                "layout": {
                    "mobile": 12,
                    "tablet": 4,
                    "desktop": 3
                },
                "rendered": "installation.user.name.length > 0"
            },
            {
                "label": "testing",
                "type": "date",
                "path": "testo",
                "rendered": "false"
            },
            {
                "label": "Root",
                "type": "map",
                "path": "root",
                "child_content": [
                    {
                        "label": "Child 1",
                        "type": "array",
                        "path": "child1",
                        "child_content": {
                            "type": "date"
                        },
                        "layout": {
                            "mobile": 12,
                            "tablet": 4,
                            "desktop": 3
                        }
                    },
                    {
                        "label": "Child 2",
                        "type": "map",
                        "path": "child2",
                        "child_content": [
                            {
                                "label": "Grandchild 1",
                                "type": "checkbox",
                                "path": "grandchild1",
                                "value": {
                                    "default": "value1",
                                    "contents": [
                                        { "text": "Value", "value": "value1" },
                                        { "text": "Eulav", "value": "value2" },
                                        { "text": "Lueva", "value": "value3" },
                                    ]
                                },
                                "layout": {
                                    "mobile": 12,
                                    "tablet": 4,
                                    "desktop": 3
                                }
                            },
                            {
                                "label": "Grandchild 2",
                                "type": "image",
                                "path": "grandchild2"
                            },
                            {
                                "label": "Grandchild 3",
                                "type": "time",
                                "path": "grandchild3",
                                "layout": {
                                    "mobile": 2,
                                    "tablet": 2,
                                    "desktop": 2
                                }
                            },
                            {
                                "label": "Grandchild 4",
                                "type": "number",
                                "path": "grandchild4",
                                "required": true,
                            }
                        ]
                    }
                ]
            }
        ]
      },
      {
          "pagename": "Options",
          "rendered": "installation.user.accept == true",
          "form": [
              {
                  "label": "Please choose installation mode",
                  "type": "dropdown",
                  "path": "installation.mode",
                  "value": {
                      "contents": [
                          { "text": "Express", "value": "express" },
                          { "text": "Custom", "value": "custom" },
                      ]
                  },
                  "layout": {
                      "mobile": 12,
                      "tablet": 4,
                      "desktop": 3
                  }
              },
              {
                  "label": "Please enter your desired directory",
                  "type": "text",
                  "path": "installation.directory",
                  "value": {
                      "default": "C:/Windows/System32"
                  },
                  "rendered": "installation.mode == 'custom'",
                  "layout": {
                      "mobile": 12,
                      "tablet": 4,
                      "desktop": 3
                  }
              }
          ]
      },
      {
          "pagename": "Finishing",
          "rendered": "true == true",
          "form": [
              {
                  "label": "Are you statisfied?",
                  "type": "toggle",
                  "path": "installation.statisfied"
              },
          ],
          "layout": {
              "mobile": 12,
              "tablet": 4,
              "desktop": 3
          }
      }
    ]
  },
  {
    id: 2,
    name: "version 1.0.1",
    description: [
      {
        "pagename": "Initializer",
        "rendered": "true",
        "form": [
            {
                "label": "Name",
                "type": "text",
                "path": "installation.user.name",
                "value": {
                    "default": null,
                    "placeholder": "Input Username"
                },
                "layout": {
                    "mobile": 12,
                    "tablet": 4,
                    "desktop": 3
                }
            },
            {
                "label": "Do you accept the terms and conditions?",
                "type": "toggle",
                "path": "installation.user.accept",
                "value": {
                    "default": false
                },
                "layout": {
                    "mobile": 12,
                    "tablet": 4,
                    "desktop": 3
                },
                "rendered": "installation.user.name.length > 0"
            },
            {
                "label": "testing",
                "type": "date",
                "path": "testo",
                "rendered": "false"
            },
            {
                "label": "Root",
                "type": "map",
                "path": "root",
                "child_content": [
                    {
                        "label": "Child 1",
                        "type": "array",
                        "path": "child1",
                        "child_content": {
                            "type": "date"
                        },
                        "layout": {
                            "mobile": 12,
                            "tablet": 4,
                            "desktop": 3
                        }
                    },
                    {
                        "label": "Child 2",
                        "type": "map",
                        "path": "child2",
                        "child_content": [
                            {
                                "label": "Grandchild 1",
                                "type": "checkbox",
                                "path": "grandchild1",
                                "value": {
                                    "default": "value1",
                                    "contents": [
                                        { "text": "Value", "value": "value1" },
                                        { "text": "Eulav", "value": "value2" },
                                        { "text": "Lueva", "value": "value3" },
                                    ]
                                },
                                "layout": {
                                    "mobile": 12,
                                    "tablet": 4,
                                    "desktop": 3
                                }
                            },
                            {
                                "label": "Grandchild 2",
                                "type": "image",
                                "path": "grandchild2"
                            },
                            {
                                "label": "Grandchild 3",
                                "type": "time",
                                "path": "grandchild3",
                                "layout": {
                                    "mobile": 2,
                                    "tablet": 2,
                                    "desktop": 2
                                }
                            },
                            {
                                "label": "Grandchild 4",
                                "type": "number",
                                "path": "grandchild4",
                                "required": true,
                            }
                        ]
                    }
                ]
            }
        ]
      },
      {
          "pagename": "Options",
          "rendered": "installation.user.accept == true",
          "form": [
              {
                  "label": "Please choose installation mode",
                  "type": "dropdown",
                  "path": "installation.mode",
                  "value": {
                      "contents": [
                          { "text": "Express", "value": "express" },
                          { "text": "Custom", "value": "custom" },
                      ]
                  },
                  "layout": {
                      "mobile": 12,
                      "tablet": 4,
                      "desktop": 3
                  }
              },
              {
                  "label": "Please enter your desired directory",
                  "type": "text",
                  "path": "installation.directory",
                  "value": {
                      "default": "C:/Windows/System32"
                  },
                  "rendered": "installation.mode == 'custom'",
                  "layout": {
                      "mobile": 12,
                      "tablet": 4,
                      "desktop": 3
                  }
              }
          ]
      },
      {
          "pagename": "Finishing",
          "rendered": "true == true",
          "form": [
              {
                  "label": "Are you statisfied?",
                  "type": "toggle",
                  "path": "installation.statisfied"
              },
          ],
          "layout": {
              "mobile": 12,
              "tablet": 4,
              "desktop": 3
          }
      }
    ]
  }
]

export default(descriptions);

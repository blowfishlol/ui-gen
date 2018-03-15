var boi = [
    {
        "pagename": "Initialize",
        "rendered": true,
        "config": [
            {
                "label": "Name",
                "type": "text",
                "path": "installation.user.name",
                "value": {
                    "default": null,
                    "placeholder": "Kimi No Nawa"
                }
            },
            {
                "label": "Do you accept the terms and conditions?",
                "type": "toggle",
                "path": "installation.user.accept",
                "value": {
                    "default": false
                },
                "rendered": "installation.user.name == true"
            }
        ]
    },
    {
        "pagename": "Options",
        "rendered": "installation.user.accept==true",
        "config": [
            {
                "label": "Please choose installation mode",
                "type": "dropdown",
                "path": "installation.mode",
                "contents": [
                    {
                        "text": "Express",
                        "value": "express"
                    },
                    {
                        "text": "Custom",
                        "value": "custom"
                    }
                ]
            },
            {
                "label": "Please enter your desired directory",
                "type": "text",
                "path": "installation.directory",
                "value": {
                    "default": "C:/Windows/System32"
                },
                "rendered": "installation.mode == \"custom\""
            }
        ]
    }
]

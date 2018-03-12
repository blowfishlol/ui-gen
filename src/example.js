var config = [
    {
        "label": "name",
        "type": "text",
        "path": "appointment.patient.name",
        "required": true,
        "value": {
            "default": null,
            "placeholder": "Enter Name Here"
        }
    },
    {
        "label": "Birth Date",
        "type": "date",
        "path": "appointment.patient.birthdate",
        "required": true,
        "value": {
            "default": null
        }
    },
    {
        "label": "Patient Photo",
        "type": "image",
        "path": "appointment.patient.image",
        "required": true,
    },
    {
        "label": "Appointment Activities",
        "type": "checkbox",
        "path": "appointment.activities",
        "required": true,
        "value": {
            "default": "Check Up",
            "contents": [
                "Check Up",
                "Operation",
                "Blood Test"
            ]
        }
    },
    {
        "label": "Need Further Examination?",
        "type": "toggle",
        "path": "appointment.furtherExamination",
    },
    {
        "label": "Payment Method",
        "type": "dropdown",
        "path": "appointment.payment.method",
        "required": true,
        "value": {
            "default": null,
            "contents": [
                "Insurance",
                "Credit Card",
                "Debit Card",
                "Cash"
            ]
        }
    },
    {
        "label": "Payment Amount",
        "type": "number",
        "path": "appointment.payment.amount",
        "required": true,
    },
    {
        "label": "Phone Numbers",
        "type": "array",
        "path": "appointment.patient.phoneNumbers",
        "child-content": {
            "type": "number",
            "required": false,
        }
    },
    {
        "label": "Cars Owned by Patient",
        "type": "map",
        "path": "appointment.patient.cars",
        "child-content": [
            {
                "label": "Car Model",
                "type": "text",
                "path": "model",
                "required": "true",
                "value": {
                    "placeholder": "Enter Car Model Here",
                }
            },
            {
                "label": "Car License Plate",
                "type": "text",
                "path": "plate",
                "required": "true",
                "value":{
                    "placeholder": "Enter Car License Here"
                },
            }
        ]
    }
];

export default(config);

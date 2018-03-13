var config = [
    {
        "label": "Patient Name",
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
            "default": "2000-01-01"
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
            "default": "checkup",
            "contents": [
                { "text": "Check Up", "value": "checkup" },
                { "text": "Operation", "value": "operation" },
                { "text": "Blood Test", "value": "bloodtest" },
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
            "default": "credit",
            "contents": [
                { "text": "Insurance", "value": "insurance" },
                { "text": "Credit Card", "value": "credit" },
                { "text": "Debit Card", "value": "debit" },
                { "text": "Cash", "value": "cash" },
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
        "child_content": {
            "type": "text",
            "required": false,
        }
    },
    {
        "label": "Cars Owned by Patient",
        "type": "map",
        "path": "appointment.patient.cars",
        "child_content": [
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
    },
    {
        "label": "Root",
        "type": "map",
        "path": "appointment.patient.cars",
        "child_content": [
            {
                "label": "Child1",
                "type": "array",
                "path": "model",
                "child_content": {
                    "type": "date",
                    "required": false,
                }
            },
            {
              "label": "Child2",
              "type": "map",
              "path": "appointment.patient.cars",
              "child_content": [
                    {
                        "label": "Grandchild1",
                        "type": "text",
                        "path": "model",
                        "required": "true",
                        "value": {
                            "placeholder": "Enter Car Model Here",
                        }
                    },
                    {
                        "label": "Grandchild2",
                        "type": "text",
                        "path": "plate",
                        "required": "true",
                        "value":{
                            "placeholder": "Enter Car License Here"
                        },
                    }
                ]
            }
        ]
    },
];
//
export default(config);

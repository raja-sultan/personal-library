interface CareerPrincipal {
    id: string;
    name: string;
    description: string;
    level?: any 
}


interface CareerLevel {
    id: string;
    name: string;
    description: string;
    levelType: string; // "Current Level" or "Next Level"
}

interface CareerArea {
    id: string;
    levels: CareerLevel[];
}

// export const careerAreasLevelData: CareerArea[] = [
//     {
//         id: '1',
//         name: "L1 - Brand Designer",
//         description: "Study the art of combining different fonts effectively to create visually appealing and readable text in your designs.",
//         level: "Current Level",
//     },
//     {
//         id: '2',
//         name: "L2 - Brand Designer",
//         description: "Study the art of combining different fonts effectively to create visually appealing and readable text in your designs.",
//         level: "Next Level",
//     },
// ]

export const careerAreasLevelData: CareerArea[] = [
    {
        id: '1',
        levels: [
            {
                id:"22",  
                name: "L1 - Brand Designer",
                description: "Study the art of combining different fonts effectively to create visually appealing and readable text in your designs.",
                levelType: "Current Level",
            },
            {
                id:"23",  
                name: "L2 - Brand Designer",
                description: "Study the art of combining different fonts effectively to create visually appealing and readable text in your designs.",
                levelType: "Next Level",
            },
        ],
    },
    // Add more objects as needed
];


export const careerAreasPrincipalData: CareerPrincipal[] = [
    {
        id: '1',
        name: "Design System",
        description: "Learn how to create layouts that adapt gracefully to various screen sizes and orientations, ensuring a consistent user experience across different devices.",

    },
    {
        id: '2',
        name: "Wireframes",
        description: "Learn how to create layouts that adapt gracefully to various screen sizes and orientations, ensuring a consistent user experience across different devices.",
        level: "Completed",
    },
    {
        id: '3',
        name: "Prototyping",
        description: "Learn how to create layouts that adapt gracefully to various screen sizes and orientations, ensuring a consistent user experience across different devices.",

    },
]





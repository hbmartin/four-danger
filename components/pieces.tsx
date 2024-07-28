
function GreenCircleDashedHole(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="50" cy="50" r="40" stroke="#6BC78A" stroke-width="2" fill="none" stroke-dasharray="5,5" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="#6BC78A" stroke-width="2" />
        </svg>
    )
}


function GreenCircleDashedSolid(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="blue"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="50" cy="50" r="40" stroke="#6BC78A" stroke-width="2" fill="none" stroke-dasharray="5,5" />
        </svg>
    )
}


function StripedGreenCircleSolid(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <pattern id="stripes" patternUnits="userSpaceOnUse" width="10" height="10">
                <polygon points="0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2" fill="#6BC78A" stroke="none" />
            </pattern>
            <circle cx="50" cy="50" r="10" fill="none" stroke="url(#stripes)" strokeWidth="50" />

        </svg>
    )
}


function StripedGreenSquareHole(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="10" y="10" width="80" height="80" fill="#996BC7" />
            <circle cx="50" cy="50" r="20" fill="white" />
            <pattern id="stripes" patternUnits="userSpaceOnUse" width="10" height="10">
                <circle cx="5" cy="5" r="4" fill="#6BC78A" stroke="none" />
            </pattern>
            <rect x="10" y="10" width="80" height="80" fill="url(#stripes)" />
        </svg>
    )
}


function HexagonIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
    )
}


function OctagonIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
        </svg>
    )
}


function SquareIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="3" rx="2" />
        </svg>
    )
}


function StarIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )
}


function TriangleIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        </svg>
    )
}


function XIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}

export { GreenCircleDashedHole, GreenCircleDashedSolid, StripedGreenCircleSolid, StripedGreenSquareHole, HexagonIcon, OctagonIcon, SquareIcon, StarIcon, TriangleIcon, XIcon }GreenCircleDashedSolid
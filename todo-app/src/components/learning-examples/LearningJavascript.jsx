const person = {
    name: 'Abhishek',
    address: {
        street: '734 SW 14th Street',
        city: 'Corvallis',
        state: 'OR',
    },
    profiles: ['twitter','instagram','linkedin'],
    printProfile: () => {
        person.profiles.map(profile => console.log(profile))
    },
}

export default function LearningJavascript () {
    return (
        <>
            <div>{person.name}</div>
            <div>{person.address.street}</div>
            <div>{person.address.city}</div>
            <div>{person.address.state}</div>
            <div>{person.profiles[1]}</div>
            <div>{ person.printProfile() }</div>
        </>
    );
}
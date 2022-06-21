
interface SeedData{
    entries: SeedEntry[]
}

interface SeedEntry{
    description: string
    status: string
    createdAt: number
    updatedAt: number
}

const status = ['PENDING', 'IN-PROGRESS', 'FINISHED'];

const randomPhrases = [
        'Frase aleatoria',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
        'On the other hand, we denounce with righteous indignation',
        'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
         
    ];

const randomEntries = (): SeedEntry[] => {
    const entries: SeedEntry[] = [];

    for(let i = 0; i < 10; i++) {
        //Random number between 0-2
        const statusIndex = Math.floor(Math.random() * 3);
        const phrasesIndex = Math.floor(Math.random() *6);
        const randomDate = Math.floor(Math.random() * i * 10000);
        entries.push({
            //Fake description
            description: randomPhrases[phrasesIndex],
            //Random status
            status: status[statusIndex],
            //Random date
            createdAt: Date.now() - randomDate,
            updatedAt: Date.now() - randomDate 
        });
    }
    return entries;
}



export const seedData: SeedData = {
    // entries:[
    //     {
    //         description: 'Pendiente: Primer tarea',
    //         createdAt: Date.now(),
    //         updatedAt: Date.now(),
    //         status: 'PENDING'
    //     },
    //     {
    //         description: 'En Progreso: Segunda tarea',
    //         createdAt: Date.now() - 1000,
    //         updatedAt: Date.now() - 1000,
    //         status: 'IN-PROGRESS'
    //     },
    //     {
    //         description: 'Finalizada: Tercer tarea',
    //         createdAt: Date.now() -1000000,
    //         updatedAt: Date.now() -1000000,
    //         status: 'FINISHED'
    //     },
    // ]
    entries: randomEntries()
}
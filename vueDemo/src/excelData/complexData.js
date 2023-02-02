const complexHead = [
    {
        header:'Supplier',
        key:'Supplier',
        width:30
    },
    {
        //第2行对应 Requirements
        header:'Inputs',
        key:'Inputs',
        width:50
    },
    {
        //第2行对应 Description
        header:'Inputs2',
        key:'Inputs2',
        width:30
    },
    {
        //合并所有列，对应一张图，从第3行开始
        header:'Process',
        key:'Process',
        width:30
    },
    {
        //对应 -Requirements
        header:'Outputs',
        key:'Outputs',
        width:30
    },
    {
        //对应 -Description
        header:'Outputs2',
        key:'Outputs2',
        width:30
    },
    {
        //对应 -Description
        header:'Customers',
        key:'Customers',
        width:30
    },
]


const complexBody = [
    {
        Supplier:'Supplier',
        Inputs:'Requirements',
        Inputs2:'Description',
        Process:'',
        Outputs:'Requirements',
        Outputs2:'Description',
        Customers:'Customers'
    },
    {
        Supplier:'ET',
        Inputs:``,
        Inputs2:'Input form&Material+D8:D13',
        Process:'',
        Outputs:'WR status:Submitted ',
        Outputs2:'WR',
        Customers:'TL'
    },
    {
        Supplier:'TL',
        Inputs:``,
        Inputs2:'1. Submitted WR',
        Process:'',
        Outputs:`1.Deadline：Agreement \n2.Hour&Work Scope:Standard hour /SOP/Agreement `,
        Outputs2:'WR Deadline/Hour/Work Scope',
        Customers:'Coordinator'
    },
    {
        Supplier:'Coordinator',
        Inputs:``,
        Inputs2:'1.Request Agreement \n 2.People',
        Process:'',
        Outputs:`1.Speed:Responded by coordinators within 24 hours \n2.People:Pass training and testing \n3.Definite the Task's degree of difficulty `,
        Outputs2:`1.Splited&Assigned Task \n2.Task deadline/Hour/work Scope \n3. Indentified processor/reviewer`,
        Customers:'Processor'
    }
]


export {
    complexHead,complexBody
}
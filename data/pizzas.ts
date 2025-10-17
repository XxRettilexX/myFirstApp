export interface Pizza {
    id: string;
    name: string;
    description: string;
    price: number;
}

export const PIZZAS: Pizza[] = [
    {
        id: 'marg-001',
        name: 'Margherita',
        description: 'La classica con pomodoro, mozzarella e basilico fresco.',
        price: 5.00,
    },
    {
        id: 'diav-002',
        name: 'Diavola',
        description: 'Pomodoro, mozzarella e salame piccante per un gusto deciso.',
        price: 6.50,
    },
    {
        id: 'capr-003',
        name: 'Capricciosa',
        description: 'Un mix ricco di pomodoro, mozzarella, funghi, carciofi e prosciutto.',
        price: 7.00,
    },
    {
        id: 'princ-004',
        name: 'Principessa',
        description: 'Un mix ricco di pomodoro, mozzarella, stracciatella, prosciutto crudo.',
        price: 7.00,
    },
];
import { InMemoryDbService } from "angular-in-memory-web-api";  

import { Category } from "./pages/categories/shared/category.model";  
import { Entry } from "./pages/entries/shared/entry.model";   

export class InMemoryDatabase implements InMemoryDbService {
    createDb(){
        const categories: Category[] = [
            {id: 1, name: "Moradia", description: "Pagamentos de contas da casa"},
            {id: 2, name: "Saúde", description: "Plano de saúde e remédios"},
            {id: 3, name: "Lazer", description: "Cinema, parques, praia e etc"},
            {id: 4, name: "Salário", description: "Recebimento de salário"},
            {id: 5, name: "Freelas", description: "Trabalhos como freelancer"}
        ];

        const entries: Entry[] = [
            {id: 1, name: 'Gás de Cozinha', categoryId: categories[0].id, category: categories[0], paid: true, date: "14/10/2018", amount: "70,80", type: "expense", description: "Descrição de Gás de Cozinha"} as Entry,
            {id: 2, name: 'Suplementos', categoryId: categories[1].id, category: categories[1], paid: false, date: "14/10/2018", amount: "15,00", type: "expense" } as Entry,
            {id: 3, name: 'Salario na Empresa X', categoryId: categories[3].id, category: categories[3], paid: true, date: "15/10/2018", amount: "4405,49", type: "revenue" } as Entry,
            {id: 4, name: 'Aluguel de filme', categoryId: categories[2].id, category: categories[2], paid: true, date: "16/10/2018", amount: "15,00", type: "expense" } as Entry,
            {id: 5, name: 'Suplementos', categoryId: categories[1].id, category: categories[1], paid: true, date: "17/10/2018", amount: "30,00", type: "expense" } as Entry,
            {id: 6, name: 'Video Game da filha', categoryId: categories[2].id, category: categories[2], paid: false, date: "17/10/2018", amount: "15,00", type: "expense" } as Entry,
            {id: 7, name: 'Uber', categoryId: categories[1].id, category: categories[1], paid: true, date: "17/10/2018", amount: "30,00", type: "expense" } as Entry,
            {id: 8, name: 'Aluguel', categoryId: categories[2].id, category: categories[2], paid: false, date: "23/10/2018", amount: "15,00", type: "expense" } as Entry,
            {id: 9, name: 'Gás de Cozinha', categoryId: categories[1].id, category: categories[1], paid: false, date: "25/10/2018", amount: "30,00", type: "expense" } as Entry,
            {id: 10, name: 'Pagamento pelo projeto XYZ', categoryId: categories[4].id, category: categories[4], paid: true, date: "25/10/2018", amount: "2980,00", type: "revenue" } as Entry,
            {id: 11, name: 'Aluguel de filme', categoryId: categories[2].id, category: categories[2], paid: false, date: "07/11/2018", amount: "15,00", type: "expense" } as Entry,
            {id: 12, name: 'Video Game da filha', categoryId: categories[1].id, category: categories[1], paid: true, date: "17/11/2018", amount: "30,00", type: "expense" } as Entry,
            {id: 13, name: 'Cinema', categoryId: categories[2].id, category: categories[2], paid: true, date: "18/11/2018", amount: "15,00", type: "expense" } as Entry,
            {id: 14, name: 'Jiu Jitsu', categoryId: categories[1].id, category: categories[1], paid: false, date: "21/11/2018", amount: "130,00", type: "expense" } as Entry,
            {id: 15, name: 'Uber', categoryId: categories[2].id, category: categories[2], paid: true, date: "28/11/2018", amount: "15,00", type: "expense" } as Entry,
            {id: 16, name: 'Cinema', categoryId: categories[1].id, category: categories[1], paid: false, date: "28/11/2018", amount: "30,00", type: "expense" } as Entry
        ]

        return { categories, entries }
    }
}
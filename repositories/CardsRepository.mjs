let idCounter = 10

let cards = [
    {
        id: 1,
        title: "Desenvolver testes unitários do módulo de crédito",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit autem quo ratione odio repudiandae, alias optio exercitationem ipsum quod vero doloremque praesentium, assumenda iste hic quis ut enim vel similique?",
        listId: 1,
        order: 1,
    },
    {
        id: 2,
        title: "Revisar documentação do projeto",
        description: "Verificar se todas as seções estão completas e atualizadas, corrigir erros gramaticais e de formatação.",
        listId: 2,
        order: 1,
    },
    {
        id: 3,
        title: "Implementar autenticação de dois fatores",
        description: "Adicionar uma camada extra de segurança ao sistema, permitindo que os usuários configurem a autenticação de dois fatores.",
        listId: 1,
        order: 6,
    },
    {
        id: 4,
        title: "Atualizar dependências do projeto",
        description: "Verificar e atualizar todas as bibliotecas e frameworks utilizados no projeto para suas versões mais recentes.",
        listId: 3,
        order: 1,
    },
    {
        id: 5,
        title: "Realizar testes de performance",
        description: "Executar testes de carga e stress para garantir que o sistema possa lidar com um grande número de usuários simultâneos.",
        listId: 2,
        order: 2,
    },
    {
        id: 6,
        title: "Corrigir bugs relatados pelos usuários",
        description: "Analisar e resolver os problemas reportados pelos usuários na última versão do sistema.",
        listId: 3,
        order: 2,
    },
    {
        id: 7,
        title: "Planejar sprint da próxima semana",
        description: "Definir as tarefas e prioridades para a próxima sprint, garantindo que todos os membros da equipe estejam alinhados.",
        listId: 1,
        order: 3,
    },
    {
        id: 8,
        title: "Realizar reunião de retrospectiva",
        description: "Discutir o que funcionou bem e o que pode ser melhorado na última sprint, e definir ações para melhorias contínuas.",
        listId: 2,
        order: 3,
    },
    {
        id: 9,
        title: "Desenvolver nova funcionalidade de exportação de dados",
        description: "Permitir que os usuários exportem seus dados em diferentes formatos, como CSV e PDF.",
        listId: 1,
        order: 4,
    },
    {
        id: 10,
        title: "Configurar ambiente de desenvolvimento",
        description: "Preparar o ambiente de desenvolvimento para novos membros da equipe, incluindo a instalação de ferramentas e configuração de acesso.",
        listId: 3,
        order: 3,
    }
];


export class CardsRepository {
    create(data) {
        cards.push(
            {
                ...data,
                id: ++idCounter,
            }
        )

        return cards.at(-1)
    }

    find(id) {
        return cards.find(card => card.id === id)
    }

    findAll() {
        return cards
    }

    findAllByListId(listId) {
        return cards.find(card => card.listId === listId)
    }

    delete(id) {
        cards = cards.filter(card => card.id !== id)
    }

    update(id, data) {
        const cardIndex = cards.findIndex(card => card.id === id)
        cards[cardIndex] = { ...cards[cardIndex], ...data }
        return cards[cardIndex]
    }
}

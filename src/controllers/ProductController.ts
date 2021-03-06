import { Request, Response } from 'express';

export = {
  async index(req: Request, res: Response) {
    const products = [{

      id: 'placahomenagem',
      parts: [
        {
          id: 'phomenagem',
          name: 'Placa de Homenagem',
          description: '',
          hasCustomFormat: true,
          attributes: [
            {
              key: 'size',
              name: 'Tamanho',
              visible: true,
              sizes: [
                {
                  id: '10x15',
                  name: '10 x 15cm',
                  position: 0,
                  image: 'reureur',
                },
                {
                  id: '21x15',
                  name: '21 x 15cm',
                  position: 1,
                  image: 'ahsahshas',
                },
              ],
            },
            {
              key: 'material',
              name: 'Materiais',
              visible: true,
              options: [
                {
                  key: 'acoinox',
                  name: 'Aço Inox Escovado',
                  position: 0,
                  show: [0, 1],
                  price: {
                    '10x15': 45.00,
                    '21x15': 70.00,
                    '30x20': 120.00,
                  },
                },
                {
                  key: 'acrilico',
                  name: 'Acrílico',
                  position: 1,
                  show: [0, 1],
                },
              ],
            },
            {
              key: 'process',
              name: 'Processo',
              visible: true,
              options: [
                {
                  key: 'gravacaorelevo',
                  name: 'Gravação Alto Relevo',
                  position: 0,
                  show: [0],
                  price: 0.00,
                },
                {
                  key: 'impressaouv',
                  name: 'Impressão UV',
                  position: 1,
                  show: [1],
                  price: 0.00,
                },
              ],
            },
            {
              key: 'model',
              name: 'Modelo Estojo',
              visible: true,
              options: [
                {
                  key: 'deluxe',
                  name: 'Modelo Luxo',
                  position: 0,
                  show: [0, 1],
                  price: {
                    acoinox: {
                      '10x15': 25.00,
                      '21x15': 45.00,
                      '30x20': 60.00,
                    },
                  },
                },
                {
                  key: 'capa',
                  name: 'Modelo Capa',
                  position: 0,
                  show: [0, 1],
                  price: {
                    acoinox: {
                      '10x15': 0.00,
                      '21x15': 0.00,
                      '30x20': 0.00,
                    },
                  },
                },
              ],
            },
          ],
        },
      ],

    }];
    return res.json(products);
  },
}

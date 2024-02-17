import prismaClient from "../../prisma";

interface ProductRequest{
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
}

class CreateProductService{
  async execute({name, price, description, banner, category_id}: ProductRequest){

    if(name === ''){
      throw new Error('Nome do produto obrigatório!')
    }

    //Verificar se esse produto já está cadastrado na plataforma
    const productAlreadyExists = await prismaClient.product.findFirst({
      where:{
        name: name
      }
    })

    if(productAlreadyExists){
      throw new Error("Produto com este nome, já existe!")
    }

    if(price === ''){
      throw new Error('Preço do produto obrigatório!')
    }

    if(description === ''){
      throw new Error('Descrição do produto obrigatório!')
    }

    // if(banner === ''){
    //   throw new Error('Banner do produto obrigatório!')
    // }

    if(category_id === ''){
      throw new Error('Categoria do produto obrigatória!')
    }

    
    const product = await prismaClient.product.create({
      data:{
        name: name,
        price: price,
        description: description,
        banner: banner,
        category_id: category_id
      },
      select:{
        id: true,
        name: true,
        price: true,
        description: true,
        category_id: true
      }
    })

    return product;

  }
}

export { CreateProductService }
import prismaClient from "../../prisma";

class ListCategoryService{
  async execute(){

    const category = await prismaClient.category.findMany({
      select:{
        id: true,
        name: true,
      }
    })

    category.sort((a, b) => (a.name < b.name ? -1 : 1));
    
    return category;

  }
}

export { ListCategoryService }
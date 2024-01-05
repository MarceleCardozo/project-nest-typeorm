import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { Product } from './product.entity';
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: ProductDTO) {
    const { name, description, value } = createProductDto;

    const product = this.productRepository.create({
      id: randomUUID(),
      name,
      description,
      value,
    });

    await this.productRepository.save(product);

    return {
      message: 'Produto Criado com sucesso',
      data: product,
    };
  }

  async findAll() {
    const products = await this.productRepository.find();

    return products;
  }

  async findOne(name: string) {
    const product = await this.productRepository.findOne({ where: { name } });

    return product;
  }

  async update(id: string, updateProductDTO: ProductDTO) {
    const { name, description, value } = updateProductDTO;

    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      return null;
    }

    product.name = name;
    product.description = description;
    product.value = value;

    await this.productRepository.save(product);

    return product;
  }

  async remove(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      return null;
    }

    await this.productRepository.remove(product);

    return {
      message: 'Produto deletado com sucesso.',
      data: product,
    };
  }
}

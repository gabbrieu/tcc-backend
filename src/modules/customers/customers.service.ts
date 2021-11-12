import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customers } from './customers.entity';
import { CreateCustomerDto } from './dto/request/createCustomer.dto';
import { GetAllRequestDto } from './dto/request/getAllRequest.dto';
import { UpdateAllCustomersDto } from './dto/request/updateAllCustomers.dto';
import { UpdateCustomerDto } from './dto/request/updateCustomer.dto';

export interface OrganizedCustomers {
  cliente_em_potencial: Customers[];
  contato_realizado: Customers[];
  visita_agendada: Customers[];
  negocio_em_andamento: Customers[];
  finalizados: Customers[];
}

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customers)
    private readonly repository: Repository<Customers>,
  ) {}

  async getOne(id: string): Promise<Customers> {
    const customer = await this.repository.findOne(id);
    if (!customer) throw new NotFoundException('Cliente não existe!');
    if (!customer.status) throw new BadRequestException('Cliente desativado!');

    return customer;
  }

  async create(req: CreateCustomerDto) {
    try {
      let orderCustomer = await this.repository.query(`
        SELECT "order"
        FROM customers
        ORDER BY "order" DESC
        LIMIT 1
      `);

      if (Object.entries(orderCustomer).length === 0) {
        orderCustomer = 1;
        const customer = await this.repository.save({
          ...req,
          order: orderCustomer,
        });

        return customer;
      }

      const customer = await this.repository.save({
        ...req,
        order: ++orderCustomer[0].order,
      });

      return customer;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('Erro ao salvar');
    }
  }

  async getAll(
    filters: GetAllRequestDto,
  ): Promise<{ data: Customers[]; count: number }> {
    let query = this.repository
      .createQueryBuilder('customer')
      .select('customer.id', 'id')
      .addSelect('customer.name', 'name')
      .addSelect('customer.email', 'email')
      .addSelect('customer.birth_date', 'birthDate')
      .addSelect('customer.document', 'document')
      .addSelect('customer.cellphone', 'cellphone')
      .addSelect('customer.gender', 'gender')
      .addSelect('customer.column', 'column')
      .addSelect('customer.order', 'order')
      .addSelect('customer.description', 'description')
      .addSelect('customer.priority', 'priority')
      .addSelect('customer.city', 'city')
      .addSelect('customer.house_number', 'houseNumber')
      .addSelect('customer.district', 'district')
      .addSelect('customer.street', 'street')
      .addSelect('customer.create_date', 'createdAt')
      .addSelect('customer.update_date', 'updatedAt')
      .take(filters.take)
      .skip(filters.skip);

    filters.status
      ? query.andWhere(`customer.status = :status`, { status: filters.status })
      : query.andWhere(`customer.status = :status`, { status: true });

    if (filters.name)
      query.andWhere(`customer.name ILIKE :name`, {
        name: `%${filters.name}%`,
      });

    if (filters.column)
      query.andWhere(`customer.column = :column`, { column: filters.column });

    query = query.orderBy('customer.order', 'ASC');

    const [data, count] = await Promise.all([
      query.clone().getRawMany(),
      query.clone().getCount(),
    ]);

    return {
      data,
      count,
    };
  }

  async update(id: string, req: UpdateCustomerDto): Promise<Customers> {
    await this.getOne(id);
    await this.repository.update(id, req);

    return await this.getOne(id);
  }

  async updateAllCustomers(req: UpdateAllCustomersDto) {
    const customers = await this.repository.find({ where: { status: true } });

    for (const customer of customers) {
      const id = customer.id;
      for (const c of req.customers) {
        if (c.id === id) {
          if (c.column !== customer.column || c.order !== customer.order) {
            customer.order = c.order;
            customer.column = c.column;
            await this.repository.save(customer);
          }
        }
      }
    }
  }

  async delete(id: string): Promise<void> {
    const customer = await this.getOne(id);
    customer.status = false;

    await this.repository.save(customer);
  }
}

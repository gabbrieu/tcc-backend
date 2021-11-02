import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customers } from './customers.entity';
import { CreateCustomerDto } from './dto/request/createCustomer.dto';
import { GetAllRequestDto } from './dto/request/getAllRequest.dto';

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
    const query = this.repository
      .createQueryBuilder('customer')
      .select('customer.id', 'id')
      .addSelect('customer.name', 'name')
      .addSelect('customer.email', 'email')
      .addSelect('customer.birth_date', 'birthDate')
      .addSelect('customer.document', 'document')
      .addSelect('customer.cellphone', 'cellPhone')
      .addSelect('customer.gender', 'gender')
      .addSelect('customer.column', 'column')
      .addSelect('customer.order', 'order')
      .addSelect('customer.description', 'description')
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

    const [data, count] = await Promise.all([
      query.clone().getRawMany(),
      query.clone().getCount(),
    ]);

    return {
      data,
      count,
    };
  }

  async getAllOrganizedByColumn() {
    let organizedCustomers = [
      [
        {
          name: 'cliente_em_potencial',
          customers: [],
        },
      ],
      [
        {
          name: 'contato_realizado',
          customers: [],
        },
      ],
      [
        {
          name: 'visita_agendada',
          customers: [],
        },
      ],
      [
        {
          name: 'negocio_em_andamento',
          customers: [],
        },
      ],
      [
        {
          name: 'finalizados',
          customers: [],
        },
      ],
    ];
    console.log(organizedCustomers[1]);
    const customers = await this.repository.find();

    customers.forEach((c) => {
      switch (c.column) {
        case 1:
          organizedCustomers[0][0].customers.push(c);
          break;

        case 2:
          organizedCustomers[0][1].customers.push(c);
          break;

        case 3:
          organizedCustomers[0][2].customers.push(c);
          break;

        case 4:
          organizedCustomers[0][3].customers.push(c);
          break;

        case 5:
          organizedCustomers[0][4].customers.push(c);
          break;

        default:
          break;
      }
    });

    return organizedCustomers;
  }

  async delete(id: string): Promise<void> {
    const customer = await this.getOne(id);
    customer.status = false;

    await this.repository.save(customer);
  }
}

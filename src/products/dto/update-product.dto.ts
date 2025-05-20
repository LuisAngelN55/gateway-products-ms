import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsOptional, IsPositive, isPositive } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
}

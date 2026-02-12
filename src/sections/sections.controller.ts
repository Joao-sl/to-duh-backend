import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('sections')
@UseGuards(JwtAuthGuard)
export class SectionsController {}

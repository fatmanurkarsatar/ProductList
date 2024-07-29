import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Tür tanımlamaları (Type Definitions)
interface Shoe {
  id: number;
  gender: string;
  brand: string;
  color: string;
  size: number;
  type: string;
  price: string;
  image_url: string;
}

interface ShoesResponse {
  shoes: Shoe[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ShoesResponse>
) {
  const filePath = path.join(process.cwd(), 'public', 'data', 'shoes.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data: ShoesResponse = JSON.parse(jsonData);

  res.status(200).json(data);
}

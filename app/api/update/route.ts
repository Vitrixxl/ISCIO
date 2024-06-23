import { promises as fs } from 'fs';
import { join } from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { path, content } = req.body;
      const filePath = join(process.cwd(), 'public', 'test.csv');
      await fs.writeFile(filePath, content);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error writing to file', error);
      res.status(500).json({ success: false, error: 'Failed to write file' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
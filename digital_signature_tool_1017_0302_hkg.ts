// 代码生成时间: 2025-10-17 03:02:23
import { createHash, createVerify, randomBytes } from 'crypto';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Entity representing a digital signature.
 */
@Entity()
class DigitalSignature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  signature: string;
}

/**
 * DigitalSignatureService class responsible for creating and verifying digital signatures.
 */
class DigitalSignatureService {

  /**
   * Generates a new digital signature.
   *
   * @param data The data to be signed.
   * @returns A promise that resolves to the generated signature.
   */
  async generateSignature(data: string): Promise<string> {
    try {
      const hash = createHash('sha256').update(data).digest('hex');
      return hash;
    } catch (error) {
      throw new Error('Failed to generate signature: ' + error.message);
    }
  }

  /**
   * Verifies a digital signature against the provided data.
   *
   * @param data The original data.
   * @param signature The signature to verify.
   * @returns A boolean indicating whether the signature is valid.
   */
  async verifySignature(data: string, signature: string): Promise<boolean> {
    try {
      const hash = createHash('sha256').update(data).digest('hex');
      return hash === signature;
    } catch (error) {
      throw new Error('Failed to verify signature: ' + error.message);
    }
  }
}

/**
 * Example usage of the DigitalSignatureService.
 */
async function main() {
  const signatureService = new DigitalSignatureService();

  try {
    const data = 'Hello, World!';
    const signature = await signatureService.generateSignature(data);
    console.log('Generated Signature:', signature);

    const isValid = await signatureService.verifySignature(data, signature);
    console.log('Signature is valid:', isValid);
  } catch (error) {
    console.error(error.message);
  }
}

main();
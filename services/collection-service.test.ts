import { describe, it, expect } from 'vitest';
import { getCollectionDetails } from '@/services/collection-service';

describe('getCollectionDetails', () => {
    it('returns a parsed collection model', async () => {
        const result = await getCollectionDetails('col-1');
        expect(result.id).toBe('col-1');
        expect(result.name).toBe('Test Collection');
        expect(result.type).toBe('collection');
        expect(result.parts).toHaveLength(1);
    });
});

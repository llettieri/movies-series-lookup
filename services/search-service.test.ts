import { describe, it, expect } from 'vitest';
import { multiSearch } from '@/services/search-service';

describe('multiSearch', () => {
    it('returns raw list DTO with results', async () => {
        const result = await multiSearch('batman', 1);
        expect(result.results).toHaveLength(1);
        expect(result.total_results).toBe(1);
    });
});

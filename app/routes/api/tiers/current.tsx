import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { requireUser } from '~/utils/session/session.server';
import { ValorantContentApiClient } from '~/utils/api/valorant/ValorantContentApiClient';
import { ValorantMediaContentApiClient } from '~/utils/api/valorant-media/ValorantMediaContentApiClient';
import { ValorantMediaCompetitiveTier } from '~/models/interfaces/valorant-media/ValorantMediaCompetitiveTier';

export type ApiCurrentCompetitiveTier = {
    tier: ValorantMediaCompetitiveTier;
};
export const loader: LoaderFunction = async ({ request }) => {
    const user = await requireUser(request);
    const activeSeason = await new ValorantContentApiClient()
        .init(user)
        .then((client) => client.getActiveSeason());

    const competitiveTiers = await new ValorantMediaContentApiClient().getCurrentCompetitiveTiers(
        activeSeason!
    );
    return json<ApiCurrentCompetitiveTier>({ tier: competitiveTiers });
};

export const CurrentCompetitiveTiersPage = () => {
    return (
        <div>
            <p>Api route only</p>
        </div>
    );
};

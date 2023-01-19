interface ValorantGun {
    ID: string;
    SkinID: string;
    SkinLevelID: string;
    ChromaID: string;
    Attachments: any[];
    CharmInstanceID: string;
    CharmID: string;
    CharmLevelID: string;
}

interface ValorantSpray {
    EquipSlotID: string;
    SprayID: string;
    SprayLevelID?: any;
}

interface ValorantIdentity {
    PlayerCardID: string;
    PlayerTitleID: string;
    AccountLevel: number;
    PreferredLevelBorderID: string;
    HideAccountLevel: boolean;
}

export interface ValorantPlayerLoadout {
    Subject: string;
    Version: number;
    Guns: ValorantGun[];
    Sprays: ValorantSpray[];
    Identity: ValorantIdentity;
    Incognito: boolean;
}

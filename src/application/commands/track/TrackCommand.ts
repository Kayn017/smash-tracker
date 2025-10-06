import { ApplicationCommandRegistry, Awaitable, Command } from "@sapphire/framework"
import { ApplicationCommandAutocompleteStringOption, ApplicationCommandOptionChoiceData, AutocompleteInteraction, SlashCommandBuilder } from "discord.js";


export default class TrackCommand extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            name: "track",
            description: "Track a tournament",
            fullCategory: ["Tournament"]
        });
    }

    public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
        const builderFn = (builder: SlashCommandBuilder) => {
            builder
                .setName(this.name)
                .setDescription(this.description)
                .addStringOption(option => 
                    option.setName('tournament')
                        .setDescription('The name of the tournament to track')
                        .setRequired(true)
                        .setAutocomplete(true)
                    );
        };

        registry.registerChatInputCommand(builderFn, {
            guildIds: this.container.config.get("NODE_ENV") === "development" && typeof this.container.config.get("DISCORD_DEV_GUILD_ID") === "string"
                ? [this.container.config.get("DISCORD_DEV_GUILD_ID") as string]
                : undefined,
            idHints: this.container.config.get("NODE_ENV") === "development" && typeof this.container.config.get("DISCORD_DEV_GUILD_ID") === "string"
                ? []
                : ["1424544518019219629"] // TODO : a garder ou pas ? 
        })

    }

    public override async autocompleteRun(interaction: AutocompleteInteraction) {
        const focused = interaction.options.getFocused(true);
        const query = String(focused.value ?? "").trim();

        const factory = this.container.tournamentProviderFactory

        if(!factory || !query) {
            return interaction.respond([]);
        }

        const providers = factory.getAllProviders()

        try {
            const choices: ApplicationCommandOptionChoiceData[] = []

            for(const provider of providers) {
                const result = await provider.searchTournaments(query, 10)

                choices.push(...result.slice(0, 25).map(t => ({
                    name: t.name,
                    value: `${t.provider}:${t.id}`
                })));
            } 

            await interaction.respond(choices)
        }
        catch(error) {
            this.container.logger.error("Error fetching tournaments for autocomplete", error);
            await interaction.respond([{ name: "Error fetching tournaments", value: "error" }]);
        }
    }

    public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        const value = interaction.options.getString('tournament', true);
        await interaction.reply(`You selected the tournament: ${value}`);
    }
}
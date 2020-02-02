/**
 * Tenta buscar uma imagem até uma das APIs retornar uma resposta ou então até
 * que se esgotem as APIs.
 * 
 * @param { [ { get: (url: string, config: object) } ] } apis APIs em que esta
 * função deve tentar buscar a imagem.
 * @param {string} imageDescription Descrição da imagem.
 * @param { [ (response: object) => void ] } callbacks Quando uma API retornar
 * uma imagem, o callback designado para essa API será chamado. Se o arranjo de
 * APIs tiver 3 elementos, este arranjo também deve ter 3 callbacks.
 */
export default async function getImage(apis, imageDescription, callbacks)
{
    let imageFetched = false;

    for (let i = 0; !imageFetched && i < apis.length; i++)
    {
        try
        {
            const response = await apis[i].get('', {
                params: {
                    q: imageDescription
                }
            });

            imageFetched = true;
            console.log(`${i} ->`, response);
            callbacks[i](response);
        }
        
        catch (error) { /* console.log(error); */ }
    }
}

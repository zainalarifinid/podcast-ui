
import Vue from "vue";
import { 
    FETCH_PODCAST
 } from "./actionTypes";
import { 
    SET_PODCAST
 } from "./mutationTypes";

const initialState = {
    podcast: {
        id: 0,
        title: "",
        duration: "",
        description: "",
        youtubeLink: "",
        user: {},
        playlist: []
    }
}

export const state = { ...initialState };

export const actions = {

    async [FETCH_PODCAST](context, idPodcast, prevPodcast){
        if (prevPodcast !== undefined){
            return context.commit(SET_PODCAST, prevPodcast);
        }

        // const { data } = await 

    }

}

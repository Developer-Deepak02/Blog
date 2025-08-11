import { supabase } from "./supabaseClient";

export const uploadImage = async (file) => {
	if (!file) throw new Error("No file provided");

	const fileName = `${Date.now()}-${file.name}`; // avoid collisions

	const { data, error } = await supabase.storage
		.from("minddraft-blog-images") 
		.upload(fileName, file);

	if (error) throw error;

	const { data: publicUrlData } = supabase.storage
		.from("minddraft-blog-images")
		.getPublicUrl(fileName);

	return publicUrlData.publicUrl;
};
